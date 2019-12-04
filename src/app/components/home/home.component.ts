import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CRUDService } from '../../services/crud.service';
import Swal from 'sweetalert2';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public mostrarMas:boolean = false
  public array: Array<any> = null;
  public array2: Array<any> = null;
  public datanews: Array<any>;
  public formulario2: FormGroup;
  public flag: number = null;
  public controlSearch: FormControl;
  private regex: RegExp = /^[a-zA-Z\s]*$/;
  public id: number;
  closeResult: string;


  constructor(private _service: CRUDService, private modalService: NgbModal) {
    this.showFriends();
    this.news();
  }
  ngOnInit() {
    this.inicializarformControlSearch();
    this.crearFormulario2();



  }

  public crearFormulario2(): void {
    this.formulario2 = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
      job: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),

    })
  }


  open(content, from, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (from == 'new') {
            console.log('new ejecutado');
            console.log(this.formulario2.value);

            this.values();

          }
          else if (from == 'othernew') {
            console.log('othrenew ejecutado');

            this.edit_this(id);
          }

        });
  }




  public showFriends() {
    console.log('corre');


    this._service.ShowFriends().subscribe((data: any) => {

      console.log(data.data);

      this.array = data.data
      this.array2 = this.array;
      console.log(this.array[0].id);



    })

  }


  public values() {





    this._service.newFriend(this.formulario2.value).subscribe((data) => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'new contact added',
        showConfirmButton: false,
        timer: 1500
      })
      this.flag = null;

    }, (error) => {
      this.flag = null;

    })

  }

  public edit_this(id) {


    this._service.updateFriend(this.formulario2.value, id).subscribe((data) => {

      console.log(data);


      Swal.fire({

        icon: 'success',
        title: 'Friend updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.flag = null;

    }, (error) => {
      this.flag = null;

    })

  }

  public dedelete_this() {


    this.flag = null




    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {


        this._service.deleteFriend().subscribe((data) => {

          console.log(data);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )



          this.flag = null;

        }, (error) => {
          this.flag = null;

        })
      }
    })




  }

  private inicializarformControlSearch() {
    this.controlSearch = new FormControl(null, [Validators.pattern(this.regex)]);

    this.controlSearch.valueChanges.pipe(
      debounceTime(2000),
      map((termino: string) => {
        this.array = this.array2;
        return this.array.filter((usuario) => usuario.first_name.toLowerCase().indexOf(termino.toLowerCase()) > -1)

      })
    ).subscribe((data) => {
      console.log(data);
      this.array = data;


    })
  }

  public news() {

    this._service.Newsapi().subscribe((data: any) => {
      console.log(data.articles);
      this.datanews = data.articles;

    })
  }

  public changenew(id){
    
    this.mostrarMas = !this.mostrarMas
    this.id = id;
    console.log(this.id);
    
  }





}
