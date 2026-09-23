class University {
    students: Student[];
    teachers: Teacher[];

    constructor(students: Student[],teachers: Teacher[]) {
        this.students = students;
        this.teachers = teachers;
    }
    showUniversityInfo(): void {
        console.log("University Information:");
        console.log("Teacher:");
        this.teachers.forEach(t=>{
            console.log(t.getTeacherInfo());
        })
        console.log("Student:");
        this.students.forEach(s => {
            console.log(s.getStudentInfo());
        });
    
        
    }
}

class Student {
    constructor(private id: string, private name: string, private faculty: string) {}

    getStudentInfo(): string {
        return `นักศึกษารหัส ${this.id} ชื่อ ${this.name} คณะ ${this.faculty}`;
    }
}
class Teacher{
    constructor(private name:string, private major:string){}
    getTeacherInfo(): string{
        return `ชิ่ออาจารย์ ${this.name} สาขาวิชา ${this.major}`;
    }
    teach(student: Student): void{
        console.log(`${this.getTeacherInfo()} สอน ${student.getStudentInfo()}`)
    }
}

const student1 = new Student("684245001", "ฮำนาจ", "Science");
const student2 = new Student("684245002", "วันเพ็ญ", "Science");
const student3 = new Student("684245003", "อภิชาติ", "Science");
const teacher1 = new Teacher("แดง","คอมพิวเตอร์")
const teacher2 = new Teacher("ดำ","คณิตศาสคร์")
const npru = new University([student1, student2, student3,],[teacher1,teacher2]);
npru.showUniversityInfo();