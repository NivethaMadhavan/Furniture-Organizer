# 3D Furniture Organizer

## Overview
The 3D Furniture Organizer is an interactive web application designed to help users visualize and organize furniture within a room. Utilizing React, react-three-fiber, and drei, this tool offers an intuitive interface for adding, scaling, moving, and rotating furniture pieces in a 3D environment.

## Features
Room Dimension Adjustment: Users can specify the dimensions of the room (length, height, breadth) to match their actual or planned space.
Furniture Management: Add various furniture models to the scene. Each piece can be selected, moved, scaled, and rotated.
Interactive Sidebar: A dynamic sidebar allows users to easily adjust room and furniture dimensions and manage furniture pieces.
Real-Time Updates: Changes to the room and furniture are reflected in real-time, offering immediate visual feedback.
Ground Plane: Ensures all furniture stays grounded, enhancing realism.

## Key Components
ThreeDScene.js
Sets up the 3D scene using react-three-fiber and drei. Manages the room dimensions, furniture objects, and their interactions.

FurnitureMenu.js
Provides an interactive sidebar for adjusting room and furniture dimensions, adding new furniture pieces, and controlling selected furniture (scaling and rotating).

FurnitureModel.js
Handles the rendering and interactions of individual furniture models, including movement and scaling within defined room bounds.

## Usage
Adjust Room Dimensions:
Use the inputs in the sidebar to set the desired room dimensions.

Add Furniture:
Click the buttons in the sidebar to add different furniture pieces to the room.

Select and Adjust Furniture:

Click on a furniture piece to select it.
Use the sidebar controls to scale and rotate the selected furniture.
Move Furniture:

Click and drag furniture pieces to move them within the room.
Furniture will remain grounded thanks to the ground plane implementation.
