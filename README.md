# Asthma Care AI

![Asthma Care Logo](/lovable-uploads/e340f3ae-832b-4085-93ce-b3175fb4d694.png)

## Overview

Asthma Care AI is a comprehensive web application designed to help users manage and assess their asthma conditions. The platform offers personalized recommendations, symptom tracking, and visualized health data through an intuitive interface powered by advanced AI technology.

## Features

- **Interactive Symptom Assessment**: Chat-based interface for evaluating asthma symptoms severity
- **Personalized Recommendations**: Get tailored advice based on your specific symptoms and history
- **User Dashboard**: Track your condition over time with visual representations of your data
- **Secure Authentication**: Protect your health data with secure login and signup
- **Responsive Design**: Seamless experience across desktop and mobile devices

## Tech Stack

### Frontend
- **React** with **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **Chart.js** for data visualization

### Backend
- **Flask** framework
- **MongoDB** for data storage
- **PyMongo** for database operations
- **Python** ML libraries for prediction model
- **JWT** for authentication

## Project Structure

## Setup Instructions

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd asthma-care-ai/flask-backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```bash
   # windows:
   venv\Scripts\activate
   #macos/linux:
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables: Create a .env file in the flask-backend directory with these variables:**
   ```bash
   SECRET_KEY=your_secure_secret_key
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   MONGODB_CLUSTER=asmthamacluster0.d6anv.mongodb.net
   MONGODB_DATABASE=asthma_care
   DEBUG=True
   FLASK_ENV=development
   ```
6. **Run the Flask server:**
   ```bash
    python run.py
    # or 
    flask --app run --debug run   
   ```

### Frontend Setup
1. **Navigate to the Frontend directory:**
   ```bash
   cd ../Frontend
   ```
2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Navigate to the Frontend directory:**
    Open your browser and navigate to http://localhost:8080

## Usage

1. **Create an account or log in with existing credentials**

2. **Take an assessment by chatting with the AI assistant about your symptoms**

3. **View your dashboard to track your asthma condition over time**

4. **Get personalized recommendations based on your assessment results**
