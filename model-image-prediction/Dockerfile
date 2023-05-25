# Use the official Python image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file and install the dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code and model
COPY main.py .
COPY model_keras_4.h5 .

# Expose the port on which the application will run
EXPOSE 8080

# Define the command to run the application
CMD ["python", "main.py"]