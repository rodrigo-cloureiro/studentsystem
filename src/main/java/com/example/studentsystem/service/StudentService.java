package com.example.studentsystem.service;

import com.example.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
    Student saveStudent(Student student);
    List<Student> getAllStudents();
    void deleteStudent(Student student);
    void editStudent(Student student);
}
