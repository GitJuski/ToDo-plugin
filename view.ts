import { ItemView, WorkspaceLeaf } from "obsidian";
import { ToDoModal } from "modal";

export const VIEW_TYPE_TODO = "todo-view";

// Create a subclass of ItemView named ToDoView and export it
export class ToDoView extends ItemView {
	// Constructor with one parameter typed WorkspaceLeaf
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
	    return VIEW_TYPE_TODO;
	}

	getDisplayText(): string {
	    return "ToDo view";
	}

	// On open do the following
	async onOpen(): Promise<void> {
		const container = this.containerEl.children[1]; // Create a const variable container of the 2 child of containerEl
		container.empty();
		const button = container.createEl("button", { text: "Add a To-Do" }); // Add a button into the container
		const ol = container.createEl("ol"); // Add an ordered list element into the container
		// Once the button is clicked, do the following
		button.onclick = () => {
		// Create a new ToDoModal object. Use this app instance as a parameter with a callback? function as a 2 parameter
			new ToDoModal(this.app, (result) => { 
				ol.createEl("li", { text: result, cls: "undone" }); // Add a li element to ol that has class undone
			}).open();
		}
	}

	// IN-PROGRESS
	async onClose(): Promise<void> {
	    
	}
}
