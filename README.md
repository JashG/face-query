## Face-query

*face-query* is a project built by a team of 4 interns at CBS Interactive's Summer 2019 company-wide hackathon.
Our goal was to build a searchable video library that allows users to search for a celebrity and discover videos
that they appear in, as well as an estimate of where in the video they appear.

## How does it work?

The project is composed of three key pieces:
    1. A Python script to fetch videos from different sources (such as YouTube)
    2. An automated video analysis system to determine which celebrities are in the video, leveraging an AWS Lambda function
    3. A way to retrieve the results (Python API) and a web interface to allow users to search for celebrities (ReactJS)

## System Architecture

[](program_architecture.png)
