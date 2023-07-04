# Before starting...
    - Add the .env file with the required variables:
    MONGODB_URI=<mongodb_uri>
    API_VERSION_PREFIX=/api/v1
    PORT=3001
    REDIS_PORT=6379
    REDIS_HOST=127.0.0.1
    REDIS_DB=0
# Requirements:
    # Install Redis server:

    Debian-based systems:
    - sudo apt install redis-server

    macOS:
        - brew install redis
        - brew services start redis

    # Check that Redi is running.
    - redis-cli ping

# Start Server:
    - npm start
# Load Arena UI for Queues:
    - navigate to http://localhost:3001/arena