import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { students } from '../../assets/data';
import { FormsModule } from '@angular/forms';
import { Validator } from '../../assets/validator';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

export interface Item {
    id: string,
    name: string,
    grade: number,
    email: string,
    date: string,
    address: string,
    city: string,
    country: string,
    zip: string,
    subject: string
};

@Component({
  selector: 'app-data-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    AngularToastifyModule
  ],
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {
  dataSource = new MatTableDataSource<Item>(students);
  // displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];
  selectedRow: Item | null = null;
  selectedItem: Item | null=null;
  isEditing: boolean = false;
  columns=[
    { label: 'ID',                    property: 'id'         ,    type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Name',                      property: 'name'            ,     type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: ' Data',             property: 'date'         ,      type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Grade',                       property: 'grade'           ,               type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Subject',                       property: 'subject'           ,               type: 'text', visible: true, cssClasses: ['font-medium'] }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  trackByProperty<T>(index: number, column:any) {
    return column.property;
  }

  constructor(private http: HttpClient, private _toastService: ToastService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  convertToDate(dateStr: string): Date {
    console.log(dateStr);
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date('Invalid Date') : date;
  }
  
  selectRow(row: Item) {
    this.selectedItem = { ...row };
    this.selectedRow = row;
  }

  addTrainee() {
    const newItem: Item = {
      id: "0",
      name: '',
      grade: 0,
      email: '',
      date: new Date().toISOString().slice(0, 10),
      address: '',
      city: '',
      country: '',
      zip: '',
      subject: ''
    };
    console.log(newItem.date);
    
    this.selectedItem = newItem;
    this.isEditing = true;
  }

  removeTrainee() {
      this.dataSource.data = this.dataSource.data.filter(item => 
        this.selectedItem!=null&&(item.id !== this.selectedItem.id ||
        item.name !== this.selectedItem.name ||
        item.grade !== this.selectedItem.grade ||
        item.date !== this.selectedItem.date ||
        item.email !== this.selectedItem.email)
      );
      this.dataSource._updateChangeSubscription();
      this.selectedItem = null;
      this.isEditing = false; 
    
  }
  
  saveTrainee() {
    if (this.selectedItem && this.validateForm()&&this.selectedItem!=null&&Validator.isValidEmail(this.selectedItem.email)
    &&this.selectedItem!=null&&Validator.validateIsraeliID(this.selectedItem.id.toString())) {
      const index = this.dataSource.data.findIndex(item => item.id === this.selectedItem?.id);
      if (index >= 0) {
        this.dataSource.data[index] = { ...this.selectedItem };
      } else {
        this.dataSource.data.push({ ...this.selectedItem });
      }
      this.dataSource._updateChangeSubscription();
      this._toastService.success('Trainee saved successfully!');
      this.isEditing = false;
    } else {
      this._toastService.error('Please fill all required fields.');
    }
  }

  validateForm(): boolean {
    if (!this.selectedItem?.name || !this.selectedItem?.email || !this.selectedItem?.grade) {
      return false;
    }
    return true;
  }



  applyFilter(event: Event) {
   
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if(filterValue.length==0){
      this.dataSource.data=students;
    }else if (filterValue.indexOf(":") > 0) {

      let [key, searchTerm] = filterValue.split(":");
      if(searchTerm.length==0){this.dataSource.data=students}

      
      this.dataSource.data = students.filter(item =>
        item[key as keyof Item]?.toString().toLowerCase().includes(searchTerm)
      );}
      else if (filterValue.indexOf("<") > 0|| filterValue.indexOf(">") > 0) {
        let [key, searchTerm] = filterValue.split(/[<>]/);
        if(searchTerm.length==0){ 
         this.dataSource.data=students}
      this.dataSource.data = students.filter(item => {
        if (key === 'grade') {
          return filterValue.indexOf(">") > 0 ? item.grade >Number(searchTerm) : item.grade < Number(searchTerm);
        } else if (key === 'date') {
          const itemDate = new Date(item.date);
          const filterDate = new Date(searchTerm);
          console.log(item.date);
          console.log(itemDate,filterDate);
          
          return filterValue.indexOf(">") > 0 ? itemDate > filterDate : itemDate < filterDate;
        }
        return false;
      }); 
      


    } 
 
    this.dataSource._updateChangeSubscription();

  }

  validateID() {
    if (this.selectedItem!=null&&!Validator.validateIsraeliID(this.selectedItem.id.toString())) {
      this._toastService.error('Please enter a valid id');
    }
  }

  checkEmail() {
    if (this.selectedItem!=null&&!Validator.isValidEmail(this.selectedItem.email)) {
      this._toastService.error('Please enter a valid email.');
    }
  }
  validateNumberInput(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  
}
