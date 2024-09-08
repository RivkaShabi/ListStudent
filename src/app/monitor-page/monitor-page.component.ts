import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { students } from '../../assets/data';
export interface StudentAverage {
  id: string;
  name: string;
  average: number;
  exams: string;  
}
@Component({
  selector: 'app-monitor-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './monitor-page.component.html',
  styleUrl: './monitor-page.component.css'
})

export class MonitorPageComponent {
  ids:string[] = [];
  trainees:StudentAverage[]=[];

  selectedIds:string[] = [];
  filterName = '';
  showPassed = true;
  showFailed = true;
  columns=[
    { label: 'ID',                    property: 'id'         ,    type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Name',                      property: 'name'            ,     type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: ' Average',             property: 'average'         ,      type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Exams',                       property: 'exams'           ,               type: 'text', visible: true, cssClasses: ['font-medium'] }
  ];
  ngOnInit(): void {
    this.calculateStudentAverages();

   
    this.studentsAvg.forEach(item=> this.studentIds.push(item.id))
    this.trainees = this.studentsAvg;
  }
  get filteredData() {
    return this.trainees.filter(trainee => {
      const matchesId = this.selectedIds.length ? this.selectedIds.includes(trainee.id) : true;
      const matchesName = this.filterName ? trainee.name.toLowerCase().includes(this.filterName.toLowerCase()) : true;
      const matchesState = (this.showPassed && trainee.average >= 65) || (this.showFailed && trainee.average < 65);
      return matchesId && matchesName && matchesState;
    });
  }

  displayedColumns: string[] = ['id', 'name', 'average', 'exams'];
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  trackByProperty<T>(index: number, column:any) {
    return column.property;
  }
  studentsAvg: StudentAverage[] = [];
  studentAvgValues: number[] = [];
  studentIds: string[] = [];
  studentNames:string[]=[];
  calculateStudentAverages() {
    this.studentsAvg = [];
  
    const studentMap = new Map<string, { name: string, grades: number[], subjects: string[] }>();
  
    students.forEach(student => {
      const studentId = student.id;
      const grade = student.grade;
      const subject = student.subject;
  
      if (!studentMap.has(studentId)) {
        studentMap.set(studentId, {
          name: student.name,
          grades: [],
          subjects: []
        });
      }
  
      const studentData = studentMap.get(studentId);
      if (studentData) {
        studentData.grades.push(grade);
        studentData.subjects.push(subject);
      }
    });
  
    studentMap.forEach((studentData, studentId) => {
      const avg = studentData.grades.reduce((sum, grade) => sum + grade, 0) / studentData.grades.length;
      const subjectsList = studentData.subjects.join(', ');  
  
      this.studentsAvg.push({
        id: studentId,
        name: studentData.name,
        average: avg,
        exams: subjectsList
      });
    });
  }
  
  
}
