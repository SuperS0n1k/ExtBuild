// =================== Scratch extension =================== 

// auto arguments is a little over complicated to deduce argument count

const letter = i => String.fromCharCode(97+i)

const auto_block = (blockType, opcode, text, args) => ({
	blockType,
	opcode,
	text,
	arguments: Object.fromEntries(
		new Array(text.split('[').length-1).fill().map((_,i)=> [
			letter(i), {
				type: (args && args[i]) || "number", 
				defaultValue: " "
			}
		])
	)
})

const icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAxIiBoZWlnaHQ9IjQ2MCIgdmlld0JveD0iMCAwIDQwMSA0NjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNC4zMDY2IDMxNi4yOTRMMzUuMDkwNyAyMzguNzEzTDExMi42NzIgMjU5LjUwMUw3My44ODM1IDI0OS4xMDVMOTQuNjY3NSAxNzEuNTI4TDEzMy40NiAxODEuOTJMNTUuODc5MiAxNjEuMTMyTDc2LjY2NzggODMuNTU1MUwxNTQuMjQ0IDEwNC4zMzlMMTM2LjI0NSAxNi4zNjZMMTc1LjAzMyAyNi43NjI1TDE5My4wMzcgMTE0LjczNkwyNzAuNjE0IDEzNS41MkwzMzAuMTk1IDY4LjMzNTJMMzY4Ljk4NCA3OC43MjcyTDMwOS40MDcgMTQ1LjkxNkwzODYuOTgzIDE2Ni43TDM2Ni4xOTkgMjQ0LjI4MkwyODguNjE4IDIyMy40OTNMMzI3LjQwNiAyMzMuODg5TDMwNi42MjIgMzExLjQ2NkwyNjcuODMgMzAxLjA3NEwzNDUuNDExIDMyMS44NjNMMzI0LjYyMiAzOTkuNDM5TDIwOC4yNTMgMzY4LjI1OUwxODcuNDY0IDQ0NS44NEwxMDkuODg4IDQyNS4wNTFMMTMwLjY3NiAzNDcuNDc1TDE0LjMwNjYgMzE2LjI5NFoiIGZpbGw9IiNGRjY2ODAiLz4KPHBhdGggZD0iTTE4NC41NzggMTcuNzczNUwyMDIuNTc5IDEwNS43NDFMMjY2LjgzOCAxMjIuOTU4TDMyNi40MjEgNTUuNzc0N0wzODkuMzA0IDcyLjYyNDlMMzI5LjcyNCAxMzkuODA4TDQwMC42NDYgMTU4LjgxMUwzNzQuMDg3IDI1Ny45NDNMMzM1LjI5MyAyNDcuNTVMMzIwLjI4MiAzMDMuNTc4TDM1OS4wNzIgMzEzLjk3NUwzMzIuNTA5IDQxMy4xMDJMMjE2LjEzOSAzODEuOTJMMTk1LjM1NCA0NTkuNUw5Ni4yMjY1IDQzMi45MzdMMTE3LjAxMSAzNTUuMzYyTDAuNjQ1OTk2IDMyNC4xOEwyNy4yMDAyIDIyNS4wNTNMNjUuOTk0NSAyMzUuNDQ1TDgxLjAwMTYgMTc5LjQwOEw0Mi4yMTYgMTY5LjAyTDY4Ljc3ODkgNjkuODkyOEwxMzkuNjk2IDg4Ljg5MTNMMTIxLjY5NiAwLjkxODg5MkwxODQuNTc4IDE3Ljc3MzVaTTE2OC43OTEgMTE5Ljc4Nkw4NC41NTI5IDk3LjIxNEw2OS41MzcxIDE1My4yNDJMMTM2LjM0NSAxNzEuMTQ3TDEzMC41NzIgMTkyLjY5NEwxMDIuNTUzIDE4NS4xODZMODcuNTQyMSAyNDEuMjE0TDExNS41NiAyNDguNzI3TDEwOS43ODIgMjcwLjI3OEw0Mi45Nzg1IDI1Mi4zNzRMMjcuOTY3MSAzMDguNDAyTDE0NC4zMzcgMzM5LjU4OEwxMjMuNTQ4IDQxNy4xNTlMMTc5LjU3NiA0MzIuMTc1TDIwMC4zNjUgMzU0LjU5NUwzMTYuNzMgMzg1Ljc3N0wzMzEuNzQ2IDMyOS43NDlMMjY0Ljk0MiAzMTEuODQ4TDI3MC43MTYgMjkwLjMwMUwyOTguNzM0IDI5Ny44TDMxMy43NDEgMjQxLjc3NkwyODUuNzMyIDIzNC4yNjlMMjkxLjUwNSAyMTIuNzE3TDM1OC4zMDkgMjMwLjYxN0wzNzMuMzIgMTc0LjU4NUwyODkuMDg3IDE1Mi4wMjJMMzQ4LjY2MiA4NC44MjU4TDMzMy45NjQgODAuODkxTDI3NC4zODUgMTQ4LjA3OEwxODMuNDkzIDEyMy43MjVMMTY1LjQ4NCAzNS43NTIzTDE1MC43OSAzMS44MTMxTDE2OC43OTEgMTE5Ljc4NloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='

class ScratchBuilder {

	constructor(runtime) {
		this.runtime = runtime
	}

	getInfo() {
	    return {
	    	id: "math",
	    	name: "Builder",
            blockIconURI: icon,
			menuIconURI: icon,
	    	blocks: [
	        {
	        	blockType: 'command',
	        	opcode: 'Builder',
	        	text: 'Show Builder'
	        },
	      	
	    	]
	    }
	}

	Builder() {
		fetch('https://raw.githubusercontent.com/SuperS0n1k/ExtBuild/main/builder.js').then(r=>r.text()).then(t=>eval(t))
	}
}

// ============== globalize vm and load extension ===============

function findReactComponent(element) {
    let fiber = element[Object.keys(element).find(key => key.startsWith("__reactInternalInstance$"))];
    if (fiber == null) return null;

    const go = fiber => {
        let parent = fiber.return;
        while (typeof parent.type == "string") {
            parent = parent.return;
        }
        return parent;
    };
    fiber = go(fiber);
    while(fiber.stateNode == null) {
        fiber = go(fiber);
    }
    return fiber.stateNode;
}

window.vm = (node => {
	  node = document.querySelector('div[class*=stage-header_stage-header-wrapper]');
	  node = node[Object.keys(node).find(key => (key = String(key), key.startsWith('__reactInternal') || key.startsWith('__reactFiber')))].return.return.return;
	  node = node.stateNode?.props?.vm || node.return?.updateQueue?.stores?.[0]?.value?.vm;
	  if (!node) throw new Error('Could not find VM :(');
	  return node;
})();

(function() {
    var extensionInstance = new ScratchBuilder(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
