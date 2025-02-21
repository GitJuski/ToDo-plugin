import { Plugin, WorkspaceLeaf } from "obsidian";
import { ToDoView, VIEW_TYPE_TODO } from "./view";

// Create a ToDoPlugin subclass from Plugin class
export default class ToDoPlugin extends Plugin {
	// Register the view and add a star ribbon icon
	async onload() {
	    this.registerView(
			VIEW_TYPE_TODO,
			(leaf) => new ToDoView(leaf)
		);

		this.addRibbonIcon("star", "Show To-Do view", () => {
			this.activateView();
		});
	}

	async onunload() {
	}

	// A function for activating the To-Do view
	async activateView() {
		const { workspace } = this.app; // Get the workspace property of this.app

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_TODO); // Get all "todo-view" leaves

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			// If no "todo-view" -> Set the leaf and set it active
			leaf = workspace.getRightLeaf(false);
			await leaf.setViewState({ type: VIEW_TYPE_TODO, active: true });
		}

		workspace.revealLeaf(leaf);
	}
}
