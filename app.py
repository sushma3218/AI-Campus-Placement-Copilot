import uvicorn
import gradio as gr
import os
import sys

# Add backend directory to path so imports work
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")))

from backend.app import app

# Create a dummy Gradio app to satisfy Hugging Face Spaces Gradio SDK requirements
demo = gr.Blocks()
with demo:
    gr.Markdown("# AI Campus Placement Copilot Backend API is Running!")
    gr.Markdown("The FastAPI server is successfully hosted here.")

# Mount the dummy Gradio app to the FastAPI app at a specific path
app = gr.mount_gradio_app(app, demo, path="/gradio")

# Hugging Face Spaces runs `python app.py` and expects something on port 7860
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)
