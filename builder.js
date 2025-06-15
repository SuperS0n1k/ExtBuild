function exportCode() {
let coke =    `
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

class ScratchCustom {

	constructor(runtime) {
		this.runtime = runtime
	}

	getInfo() {
    `+document.getElementById("code-area").value+`
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
    var extensionInstance = new ScratchCustom(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
    `
  const code = coke;
  console.log(code);
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'code.js';
  a.click();

  URL.revokeObjectURL(url);	
}

document.body.innerHTML += `
<div class="ReactModalPortal">
  <div class="modal-overlay modal-overlay">
    <div class="modal-content mod-social modal-sizes modal-content mod-social" tabindex="-1" role="dialog" aria-label="Copy Link" aria-modal="true">
      <div class="social-modal-header modal-header">
        <div class="modal-title">Extension Builder</div>
      </div>
      <div class="modal-inner-content social-modal-content">
        <div class="embed-section">
          <div class="flex-row social-row social-spaced-row">
            <div class="flex-row social-label-row">
              <div class="social-label-title">Code</div>
              <div class="flex-row social-spaced-row social-row-right">
                <div class="social-label-item social-label-result social-hidden">Exported</div>
                <div class="social-label-item" onclick="exportCode()">
                  <a>Export Code</a>
                </div>
              </div>
            </div>
            <textarea id="code-area" class="social-form social-textarea" name="embed" style="height:500px">
	    return {
	    	id: "myExtension",
	    	name: "My Extension",
	    	blocks: [
	        {
	        	blockType: 'command',
	        	opcode: 'Out',
	        	text: 'output [a] to [b]',
	        	arguments: {
	        		a: {
	        			type: "number",
	        			defaultValue: " "
	        		},
	        		b: {
	        			type: "string",
	        			defaultValue:" "
	        		}
	        	}
	        },
	      	
	    	]
	    }
	}

	Out({a,b}, util) {
		let variable = util.target.lookupOrCreateList(undefined, b);
	    if(variable)
       		variable.value = a.split(' ');
	}</textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`

