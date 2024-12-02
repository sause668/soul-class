## Pages

### Landing Page
* As a logged out user, I should be able to view the landing page.
    * When on the `/` page:
        * I can create a new profile.
        * I can log into an existing profile.

### Dashboard Page (Teacher)
* As a logged in teacher user, I should be able to view the dashboard page. 
    * When on the `/` page:
        * I can view all my classes with the number of students in each.
        * I can navigate to the grade book page of an individual class.
        * I can create, edit, and delete a class.
        
### Dashboard Page (Student)
* As a logged in student user, I should be able to view the dashboard page. 
    * When on the `/` page:
        * I can view all my classes with my current grade in each of them.
        * I can navigate to the grade page of an individual class.
        
### Grade Book Page
* As a logged in teacher user, I should be able to view the grade book page. 
    * When on the `/gradebook/:classId` page:
        * I can view all students, assignments and grades associated with one of my individual classes.
        * I can create, edit, and delete an assignment.
        * I can create, edit, and delete a grade.

### Grades Page
* As a logged in student user, I should be able to view the grade page. 
    * When on the `/grades/:classId` page:
        * I can view all assignments and grades associated with one of my individual classes.

## Classes

### Create Class
* As a logged-in teacher user, I should be able to create a new class.
    * When on the `/` page:
       * I can create a new class.
        * I should receive a message confirming the new class was created successfully.
       * I should be able to view the new class on my class list after creation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."

### Edit Class
* As a logged-in teacher user, I should be able to edit my classes.
    * When on the `/` page:
       * I can edit a class from my class list.
        * I should receive a message confirming the class was edited successfully.
       * I should be able to view the changes to my class in my class list after confirmation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."

### Delete Class
* As a logged-in teacher user, I should be able to delete my classes.
    * When on the `/` page:
       * I can delete a class from my class list.
        * I should receive a message confirming the class was deleted successfully.
       * I should not be able to see the deleted class in my class list after confirmation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."

## Assignments

### Create Assignment
* As a logged-in teacher user, I should be able to create a new assignment.
    * When on the `/gradebook/:classId` page:
       * I can create a new assignment.
        * I should receive a message confirming the new assignment was created successfully.
       * I should be able to view the new assignment on my grade book table after creation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."

### Edit Assignment
* As a logged-in teacher user, I should be able to edit my assignments.
    * When on the `/gradebook/:classId` page:
       * I can edit an assignment from my grade book table.
        * I should receive a message confirming the assignment was edited successfully.
       * I should be able to view the changes to my assignment in my grade book table after confirmation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."

### Delete Assignment
* As a logged-in teacher user, I should be able to delete my assignments.
    * When on the `/gradebook/:classId` page:
       * I can delete an assignment from my grade book table.
        * I should receive a message confirming the assignment was deleted successfully.
       * I should not be able to see the deleted assignment in my grade book table after confirmation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."

## Grades

### Create Grade
* As a logged-in teacher user, I should be able to create a new grade.
    * When on the `/gradebook/:classId` page:
       * I can create a new grade.
        * I should receive a message confirming the new grade was created successfully.
       * I should be able to view the new grade on my grade book table after creation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."

### Edit Grade
* As a logged-in teacher user, I should be able to edit my grades.
    * When on the `/gradebook/:classId` page:
       * I can edit a grade from my grade book table.
        * I should receive a message confirming the grade was edited successfully.
       * I should be able to view the changes to my grade in my grade book table after confirmation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."

### Delete Grade
* As a logged-in teacher user, I should be able to delete my grade.
    * When on the `/gradebook/:classId` page:
       * I can delete a grade from my grade book table.
        * I should receive a message confirming the grade was deleted successfully.
       * I should not be able to see the deleted grade in my grade book table after confirmation.
       * If I am not authenticated, I should receive a 401 error with the message "Authentication required."
       * If I am not a teacher user, I should receive a 401 error with the message "Teacher account required."