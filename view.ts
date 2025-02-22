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

		const button: HTMLButtonElement = container.createEl("button", { text: "Add a To-Do" }); // Add a button into the container
		const deleteButton: HTMLButtonElement = container.createEl("button", { text: "Delete mode" }) // A button for using delete mode
		const ol: HTMLOListElement = container.createEl("ol"); // Add an ordered list element into the container

		let deleteModeActive: boolean = false; // Checks if delete mode is active or not

		// Toggles delete mode on/off
		deleteButton.onclick = () => {
			// if delete mode is not active -> activate it and turn the button red
			if (!deleteModeActive) {
				deleteModeActive = true;
				deleteButton.style.backgroundColor = "red";
			} else {
				deleteModeActive = false;
				deleteButton.style.backgroundColor = "";
			}
		}

		// Once the button is clicked, do the following
		button.onclick = () => {
		// Create a new ToDoModal object. Use this app instance as a parameter with a callback? function as a 2 parameter
			new ToDoModal(this.app, (result) => { 
				const li: HTMLLIElement = ol.createEl("li", { text: result, cls: "undone" }); // Add a li element to ol that has class undone
				li.onclick = () => {
					// If delete mode is active and you click on a list item -> remove it
					if (deleteModeActive) {
						li.remove();
					}
					if (li.className == "undone") {
						li.className = "done";
					} else {
						li.className = "undone";
					}
				}
			}).open();
		}
	}

	// IN-PROGRESS
	async onClose(): Promise<void> {
	    
	}
}
