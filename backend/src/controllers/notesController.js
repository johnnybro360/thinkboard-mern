import Note from "../models/Note.js";

export async function getAllNotes(_, res) {

    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes", error);
        res.status(500).json({ message: "Error fetching notes" });
    }
}

export async function getNoteById(req, res) {
    const { id } = req.params;
  
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note", error);
        res.status(500).json({ message: "Error fetching note" });
    }
}


export async function createNote(req, res) {
    const { title, content } = req.body;

    try {
        const newNote = new Note({ title, content });

        const savedNote = await newNote.save();

        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating note", error);
        res.status(500).json({ message: "Error creating note" });
    }
}

export async function updateNote(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error updating note", error);
        res.status(500).json({ message: "Error updating note" });
    }
}

export async function deleteNote(req, res) {

    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note", error);
        res.status(500).json({ message: "Error deleting note" });
    }

}