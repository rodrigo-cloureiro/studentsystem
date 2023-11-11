package com.example.studentsystem.controller;

import com.example.studentsystem.model.Student;
import com.example.studentsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public String add(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "New student is added";
    }

    @GetMapping("/getAll")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @DeleteMapping("/delete")
    public String delete(@RequestBody Student student) {
        studentService.deleteStudent(student);
        return "Student is deleted";
    }

    @PutMapping("/edit/{id}")
    public String edit(@RequestBody Student student, @PathVariable Integer id) {
        studentService.editStudent(student);
        return "Student was edited";
    }
}
