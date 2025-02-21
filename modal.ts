import { App, Modal, Setting } from "obsidian";

// Create a subclass ToDoModal and export it
export class ToDoModal extends Modal {
	// Constructor with two paramerters. App type app and function type onSubmit that takes one parameter result type string
	constructor(app: App, onSubmit: (result: string) => void) {
		super(app);
			this.setTitle("Add a To-Do");
			let todo = "";

			// Add a input area for inputting the ToDo
		new Setting(this.contentEl)
		  .setName("To-Do")
		  .addText((text) => 
			text.onChange((value) => {
			  todo = value;
			}));

			// Add an add button
		new Setting(this.contentEl)
		  .addButton((btn) =>
			btn
			  .setButtonText("Add")
			  .setCta()
			  .onClick(() => {
				  this.close();
				  onSubmit(todo);
			  }));
	}
}
