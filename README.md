# Soul Academy
Brief Description

Contact: [LinkedIn](https://www.linkedin.com/in/kamara-reynolds-41248686/)

## Live Link
https://soul-class.onrender.com/

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

### Database:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting:
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Page Overview
## Landing Page
![landing]

## Dashboard (Teacher)
![dash-teacher]

## Dashboard (Student)
![dash-student]

## Grade Book Page (Teacher Only)
![gradebook]

## Grades Page (Student Only)
![grades]

[landing]: ./images/landing.png
[dash-teacher]: ./images/dash-teacher.png
[dash-student]: ./images/dash-student.png
[gradebook]: ./images/gradebook.png
[grades]: ./images/grades.png


<!-- # Installation 
1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date. -->


# Endpoints

### Get the Current User (Teacher)

Returns the information about the current teacher user that is logged in.

* Request: GET /api/auth

* Response: 200
    ```json
    {
      "id": 1,
      "firstName": "Severus",
      "lastName": "Snape",
      "email": "ssname@soulachademey.com",
      "username": "ssnape",
      "type": "teacher",
      "teacher": {
        "id": 1,
        "user_id": 1,
        "primary_grade": 8,
        "primary_subject": "Math"
      }
    }
    ```
    
* Error Response: 401
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Get the Current User (Student)

Returns the information about the current student user that is logged in.

* Request: GET /api/auth

* Response: 200
    ```json
    {
      "id": 5,
      "firstName": "Harry",
      "lastName": "Potter",
      "email": "hpotter@soulachademy.com",
      "username": "hpotter",
      "type": "student",
      "student": {
        "id": 1,
        "grade": 8
      }
    }
    ```

* Error Response: 401
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Log In a User (Teacher)

Logs in a current user with valid credentials and returns the current user's
information.

* Request: POST /api/auth/login
    ```json
    {
      "email": "ssnape@soulacademy.com",
      "password": "password",
      "type": "teacher",
    }
    ```

* Response: 200
    ```json
    {
      "id": 1,
      "firstName": "Severus",
      "lastName": "Snape",
      "email": "ssname@soulachademey.com",
      "username": "ssnape",
      "type": "teacher",
      "teacher": {
          "id": 1,
          "user_id": 1,
          "primary_grade": 8,
          "primary_subject": "Math"
      }
    }
    ```

* Error Response: 401
    ```json
    {
      "email": "Email provided not found.",
      "password": "Password was incorrect.",
    }
    ```

### Log In a User (Student)

Logs in a current user with valid credentials and returns the current user's
information.

* Request: POST /api/auth/login
    ```json
    {
        "email": "hpotter@soulacademy.com",
        "password": "secret password",
        "type": "student",
    }
    ```

* Response: 200
    ```json
    {
      "id": 5,
      "firstName": "Harry",
      "lastName": "Potter",
      "email": "hpotter@soulachademy.com",
      "username": "hpotter",
      "type": "student",
      "student": {
        "id": 1,
        "grade": 8
      }
    }
    ```

* Error Response: 401
    ```json
    {
      "email": "Email provided not found.",
      "password": "Password was incorrect.",
    }
    ```

### Sign Up a User (Teacher)

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Request: POST /api/auth/signup
    ```json
    {
        "firstName": "Severus",
        "lastName": "Snape",
        "email": "ssname@soulachademey.com",
        "username": "ssnape",
        "password": "password",
        "type": "teacher",
        "primary_grade": 8,
        "primary_subject": "Math"
    }
    ```

* Response: 201
    ```json
    {
      "id": 1,
      "firstName": "Severus",
      "lastName": "Snape",
      "email": "ssname@soulachademey.com",
      "username": "ssnape",
      "type": "teacher",
      "teacher": {
          "id": 1,
          "user_id": 1,
          "primary_grade": 8,
          "primary_subject": "Math"
      }
    }
    ```

* Error response: 401
    ```json
    {
      "email": "Email address is already in use.",
      "username": "Username is already in use.",
      "password": "Password required",
      "first_name": "Maximum 20 characters",
      "last_name": "Maximum 20 characters",
      "type": "Type Required",
      "primary_grade": "Must be between 6 and 8",
      "primary_subject": "Subject Required"
    }
    ```

### Sign Up a User (Student)

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Request: POST /api/auth/signup
    ```json
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "email": "hpotter@soulachademy.com",
        "username": "hpotter",
        "password": "password",
        "type": "student",
        "grade": 8
    }
    ```

* Response: 201
    ```json
    {
      "id": 5,
      "firstName": "Harry",
      "lastName": "Potter",
      "email": "hpotter@soulachademy.com",
      "username": "hpotter",
      "type": "student",
      "student": {
        "id": 1,
        "grade": 8
      }
    }
    ```

* Error response: 401
    ```json
    {
      "email": "Email address is already in use.",
      "username": "Username is already in use.",
      "password": "Password required",
      "first_name": "Maximum 20 characters",
      "last_name": "Maximum 20 characters",
      "type": "Type Required",
      "grade": "Must be between 6 and 8"
    }
    ```

## CLASSES

### Get all User Classes (Teacher) - Dashboard Page

Returns all teacher classes.

* Request: GET /api/classes

* Response: 200
    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "numStudents": 1
      },
    ]
    ```

### Get all User Classes (Student) - Dashboard Page

Returns all student classes.

* Request: GET /api/classes

* Response: 200
    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "teacher": {
          "id": 1,
          "user_id": 1,
          "primary_grade": 8,
          "primary_subject": "Math",
          "first_name": "Severus",
          "last_name": "Snape"
        },
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "assignments": [
          {
            "id": 1,
            "class_id": 1,
            "name": "Exponents Classwork",
            "type": "CW",
            "quarter": 1,
            "due_date": "Mon, 19 Aug 2024",
            "grade": 82
          }
        ]
      }
    ]
    ```

### Get Class by ID (Teacher) - Grade Book Page

Returns teacher's class by ID with all the information needed for the grade book page.

* Request: GET /api/classes/:classId

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        },
      ]
    }
    ```

### Get Class by ID (Student) - Grade Page

Returns student's class by ID with all information for the grade page.

* Request: GET /api/classes/:classId

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "teacher": {
        "id": 1,
        "user_id": 1,
        "primary_grade": 8,
        "primary_subject": "Math",
        "first_name": "Severus",
        "last_name": "Snape"
      },
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grade": 82
        },
      ]
    }
    ```

### Create Class

Creates new class.

* Request: POST /api/classes
    ```json
    {
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 2,
      "room": 315
    }
    ```

* Response: 200
    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "numStudents": 1
      },
      {
        "id": 2,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 2,
        "room": 315,
        "numStudents": 0
      },
    ]
    ```

* Error Response: 401
    ```json
    {
      "name": "Name address is required",
      "subject": "Subject is required",
      "grade": "Must be between 6 and 8",
      "period": "Must be between 1 and 4",
      "room": "Must be between 100 and 350"
    }
    ```

### Edit Class

Edits class by ID.

* Request: GET /api/classes/:classId
    {
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 3,
      "room": 315
    }
    ```

* Response: 200
    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "numStudents": 1
      },
      {
        "id": 2,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 3,
        "room": 315,
        "numStudents": 0
      },
    ]
    ```

* Error Response: 401
    ```json
    {
      "name": "Name address is required",
      "subject": "Subject is required",
      "grade": "Must be between 6 and 8",
      "period": "Must be between 1 and 4",
      "room": "Must be between 100 and 350"
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Class not found"
    }
    ```

### Delete Class

Deletes class by ID.

* Request: GET /api/classes/:classId

* Response: 200
    ```json
    [
      {
        "id": 1,
        "teacher_id": 1,
        "name": "Algebra",
        "subject": "Math",
        "grade": 8,
        "period": 1,
        "room": 315,
        "numStudents": 1
      },
    ]
    ```

* Error response: 404
    ```json
    {
      "message": "Class couldn't be found"
    }
    ```

## ASSIGNMENTS

### Create Assignment

Creates class assignment.

* Request: POST /api/classes/:classId/assignments
    ```json
    {
        "name": "Exponents Homework",
        "type": "HW",
        "quarter": 1,
        "due_date": "22-8-24",
    }
    ```

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        },
        {
          "id": 2,
          "class_id": 1,
          "name": "Exponents Homework",
          "type": "HW",
          "quarter": 1,
          "due_date": "Thu, 22 Aug 2024",
          "grades": []
        },
      ]
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Class not found"
    }
    ```

* Error Response: 400
    ```json
    {
      "name": "Name is required",
      "type": "Type is required",
      "quarter": "Must be between 1 and 4",
      "due_date": "Improper date",
    }
    ```

### Edit Assignment

Edits class assignment by ID.

* Request: PUT /api/assignments/:assignmentId
    ```json
    {
      "name": "Exponents Homework",
      "type": "HW",
      "quarter": 1,
      "due_date": "23-8-24",
    }
    ```

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        },
        {
          "id": 2,
          "class_id": 1,
          "name": "Exponents Homework",
          "type": "HW",
          "quarter": 1,
          "due_date": "Fri, 23 Aug 2024",
          "grades": []
        },
      ]
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Assignment not found"
    }
    ```

* Error Response: 400
    ```json
    {
      "name": "Name is required",
      "type": "Type is required",
      "quarter": "Must be between 1 and 4",
      "due_date": "Improper date",
    }
    ```

### Delete Assignment

Deletes class assignment by ID.

* Request: DELETE /api/assignments/:assignmentId

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Wed, 21 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        },
      ]
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Assignment not found"
    }
    ```

## STUDENTS

### Add Student

Adds a Student to a classroom.

* Request: POST /api/classes/:classId/students/:studentId

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "id": 6,
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        }
      ]
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Class not found"
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Student not found"
    }
    ```

* Error Response: 401
    ```json
    {
      "message": "Student Already Exists"
    }
    ```

### Remove Student

Remove a Student to a classroom.

* Request: DELETE /api/classes/:classId/students/:studentId

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        }
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
          ]
        }
      ]
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Class not found"
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Student not found"
    }
    ```

* Error Response: 401
    ```json
    {
      "message": "Student is not in this class"
    }
    ```


## GRADES

### Create Grade

Creates new grade.

* Request: POST /api/assignments/:assignmentId/grades/:studentId
    ```json
    {
      "grade": 90
    }
    ```

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "id": 6,
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
            {
              "assignment_id": 1,
              "student_id": 6,
              "grade": 90
            }
          ]
        }
      ]
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Assignment couldn't be found"
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Student couldn't be found"
    }
    ```

* Error Response: 400
    ```json
    {
      "grade": "Must be between 0 and 100"
    }
    ```

### Edit Grade

Edits grade by ID.

* Request: PUT /api/assignments/:assignmentId/grades/:studentId
    ```json
    {
        "grade": 85
    }
    ```

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "id": 6,
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            },
            {
              "assignment_id": 1,
              "student_id": 6,
              "grade": 85
            }
          ]
        }
      ]
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Grade couldn't be found"
    }
    ```

* Error Response: 400
    ```json
    {
      "grade": "Grade is required"
    }
    ```

### Delete Grade

Deletes grade by ID.

* Request: DELETE /api/assignments/:assignmentId/grades/:studentId

* Response: 200
    ```json
    {
      "id": 1,
      "teacher_id": 1,
      "name": "Algebra",
      "subject": "Math",
      "grade": 8,
      "period": 1,
      "room": 315,
      "students": [
        {
          "id": 5,
          "firstName": "Harry",
          "lastName": "Potter"
        },
        {
          "id": 6,
          "firstName": "Ronald",
          "lastName": "Weasley"
        },
      ],
      "assignments": [
        {
          "id": 1,
          "class_id": 1,
          "name": "Exponents Classwork",
          "type": "CW",
          "quarter": 1,
          "due_date": "Mon, 19 Aug 2024",
          "grades": [
            {
              "assignment_id": 1,
              "student_id": 5,
              "grade": 82
            }
          ]
        }
      ]
    }
    ```

* Error response: 404
    ```json
    {
      "message": "Grade couldn't be found"
    }
    ```

# Technical Implementation
A lot of thought went into the implementation of the grade book table.  The system requires complex and dynamic information pulled from the database.  In the end, the use of one dynamic object became the optimal choice.  All database changes like a new assignment of grade return an updated version of the object.  Here's an example of the object:

```javascript
{
  id: 1,
  teacher_id: 1,
  name: "Algebra",
  subject: "Math",
  grade: 8,
  period: 1,
  room: 315,
  students: [
    {
      id: 5,
      firstName: "Harry",
      lastName: "Potter"
    }, //more students
  ],
  assignments: [
    {
      id: 1,
      class_id: 1,
      name: "Exponents Classwork",
      type: "CW",
      quarter: 1,
      due_date: "Mon, 19 Aug 2024",
      grades: [
        {
          assignment_id: 1,
          student_id: 5,
          grade: 82
        }, //more grades
      ]
    }, //more assignments
  ]
}
```

# Future Features
- Student search and information page
- Class wide and school wide announcement wall with options to comment
- Appointment system for teacher, staff and parents