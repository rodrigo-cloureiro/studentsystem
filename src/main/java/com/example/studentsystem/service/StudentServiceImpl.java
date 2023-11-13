package com.example.studentsystem.service;

import com.example.studentsystem.model.Student;
import com.example.studentsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public void deleteStudent(Student student) {
        studentRepository.delete(student);
    }

    @Override
    public void editStudent(Student student) {
        System.out.println(student.getId());
        Student existingStudent = studentRepository.findById(student.getId()).orElse(null);
        existingStudent.setName(student.getName());
        existingStudent.setAddress(student.getAddress());
        studentRepository.save(student);
    }

    /*@Override
    public List<Student> search(String name) {
        return studentRepository.findAll().stream().filter(student -> student.getName().equals(name)).toList();
    }*/

    @Override
    public List<Student> search(String name) {
        return studentRepository.findByName(name);
    }
}
