package com.example.studentsystem.service;

import com.example.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public void deleteStudent(Student student);
    public void editStudent(Student student);
}
