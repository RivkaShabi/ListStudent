import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartComponent } from '../chart/chart.component';
import { students } from '../../assets/data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis-page',
  standalone: true,
  imports: [FormsModule,CommonModule, MatTabsModule,DragDropModule,MatSelectModule,MatButtonModule,MatCardModule,MatPaginatorModule,MatTableModule,MatInputModule,MatFormFieldModule,ChartComponent],
  templateUrl: './analysis-page.component.html',
  styleUrl: './analysis-page.component.css'
})
export class AnalysisPageComponent {

  selectedIDs: string[] = [];
  studentIds: string[] = [];

  selectedSubjects: string[] = [];




  subjectsAvg: { subject: string, avg: number }[] = [];
  studentsAvg: { student: string, avg: number }[] = [];
  studentsAvgSelected: { student: string, avg: number }[] = [];
  subjectsAvgSelected: { subject: string, avg: number }[] = [];

  subjectAvgValues: number[] = [];
  subjectNames: string[] = []; 
  subjectAvgValuesSelected: number[] = [];
  subjectNamesSelected: string[] = [];

  studentAvgValues: number[] = [];

  studentAvgValuesSelected: number[] = [];
  studentIdsSelected: string[] = [];


  topCharts: { type: string, data: any }[] = [];
  bottomChart: { type: string, data: any } | null = null;

  constructor() {}

  ngOnInit() {

    this.topCharts = [
      { type: 'subjects', data: { values: this.subjectAvgValuesSelected, labels: this.subjectNamesSelected } },
      { type: 'students', data: { values: this.studentAvgValues, labels: this.studentIds } }
    ];
    this.calculateSubjectAverages();
    this.calculateStudentAverages();
    this.studentIdsSelectedNoEmpty();
    this.subjectNamesSelectedNoEmpty();

  }

  calculateSubjectAverages() {
    const subjectMap = new Map<string, number[]>();

    students.forEach(student => {
      const subject = student.subject;
      const grade = student.grade;
      if (!subjectMap.has(subject)) {
        subjectMap.set(subject, []);
      }
      subjectMap.get(subject)!.push(grade);
  });

    subjectMap.forEach((grades, subject) => {
      const avg = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      this.subjectsAvg.push({ subject, avg });
      this.subjectAvgValues.push(avg);
      this.subjectNames.push(subject);
    });
  }
  calculateSubjectSelectedAverages() {
    const subjectMap = new Map<string, number[]>();

    students.forEach(student => {
      const subject = student.subject;
      const grade = student.grade;
      if(this.selectedSubjects.includes(student.subject)){
      if (!subjectMap.has(subject)) {
        subjectMap.set(subject, []);
      }
      subjectMap.get(subject)!.push(grade);
  }});
  this.subjectsAvgSelected=[];
  this.subjectAvgValuesSelected=[];
  this.subjectNamesSelected=[];
    subjectMap.forEach((grades, subject) => {
      const avg = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      this.subjectsAvgSelected.push({ subject, avg });
      this.subjectAvgValuesSelected.push(avg);
      this.subjectNamesSelected.push(subject);
});        
this.subjectNamesSelectedNoEmpty()

  }
  calculateStudentAverages() {
    const studentMap = new Map<string, number[]>();

    students.forEach(student => {
      const studentId = student.id;
      const grade = student.grade;
      if (!studentMap.has(studentId)) {
        studentMap.set(studentId, []);
      }
      studentMap.get(studentId)!.push(grade);
    });

    studentMap.forEach((grades, student) => {
      const avg = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      this.studentsAvg.push({ student, avg });
      this.studentAvgValues.push(avg);
      this.studentIds.push(student);
    });
  }

  calculateStudentSelectedAverages() {
    const studentMap = new Map<string, number[]>();

    students.forEach(student => {
      const studentId = student.id;
      const grade = student.grade;
      if(this.selectedIDs.includes(student.id)){
      if (!studentMap.has(studentId)) {
        studentMap.set(studentId, []);
      }
      studentMap.get(studentId)!.push(grade);
   } });
   this.studentsAvgSelected=[];
   this.studentAvgValuesSelected=[];
   this.studentIdsSelected=[];
    studentMap.forEach((grades, student) => {
      const avg = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      this.studentsAvgSelected.push({ student, avg });
      this.studentAvgValuesSelected.push(avg);
      this.studentIdsSelected.push(student);
});     
         this.studentIdsSelectedNoEmpty();

  }
  studentIdsSelectedNoEmpty(){
    if(this.studentIdsSelected.length==0){
      this.studentIdsSelected=this.studentIds;
      this.studentAvgValuesSelected= this.studentAvgValues;
      this.studentsAvgSelected=this.studentsAvg;
    }
  }
  subjectNamesSelectedNoEmpty(){
    if(this.subjectNamesSelected.length==0){
      this.subjectNamesSelected=this.subjectNames;
      this.subjectAvgValuesSelected=this.subjectAvgValues;
      this.subjectsAvgSelected=this.subjectsAvg;
    }
  }

  draggedDiv: string | null = 'div3'; 

  
  onDrop(event: CdkDragDrop<any[]>) {
    const classList = event.item.element.nativeElement.classList;

    if (classList.contains('div1')) {
      this.draggedDiv = 'div1';
    } else if (classList.contains('div2')) {
      this.draggedDiv = 'div2';
    } else if (classList.contains('div3')) {
      this.draggedDiv = 'div3';
    }

  }
}
