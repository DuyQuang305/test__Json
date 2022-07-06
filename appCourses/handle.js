coursesApi = 'http://localhost:3000/courses'

function start() {
        getCourses(renderCourses)
        
        handleCreateCourse()
}

start()

function getCourses(callback) {
        fetch(coursesApi)
                .then(function (response) {
                        return response.json()
                })
                .then(callback)
}

function createCourses(data, callback) {
        var postApi = {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                      },
                body: JSON.stringify(data)
        }
        fetch(coursesApi, postApi)
        .then(function (response) {
                return response.json()
        })
        .then(callback)
}


function deleteCourses(id) {
        var postApi = {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json',
                      }
        }
        fetch(coursesApi + '/' + id, postApi)
        .then(function (response) {
                return response.json()
        })
        .then(function(){
                var courseItem = document.querySelector('.course-' + id)
                if(courseItem) {
                        courseItem.remove()
                }
        })

}

function renderCourses(courses) {
        var listCourses = document.querySelector('#list-course');
        var htmls = courses.map(function (course) {
        return `
                        <li class="course-${course.id}">
                                <h4>${course.title}</h4>
                                <span>${course.description}</span>
                                <button  onclick="deleteCourses(${course.id})">Delete</button>
                        </li>
                `
                
                        
        })

        listCourses.innerHTML = htmls.join('')
 
}

function handleCreateCourse() {
        
        createBtn = document.querySelector('.btn-create')
        createBtn.onclick = function () {
                var title = document.querySelector('input[name="title"]').value
                var description = document.querySelector('input[name="description"]').value

                var formData = {
                        title: title,
                        description: description
                }

                createCourses(formData, function () {
                        getCourses(renderCourses)
                })
        }
}




        
      
                                
                                
                                
