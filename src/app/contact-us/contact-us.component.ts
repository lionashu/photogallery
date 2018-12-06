import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatError} from "@angular/material";
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as $ from 'jquery';



@Component({
    selector: 'app-contact',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    form: FormGroup;
    formErrors: any;
    private _unsubscribeAll: Subject<any>;
    constructor(private _formBuilder: FormBuilder) {
        this.openMenu();
        this.formErrors = {
            name: {},
            email: {},
            topic: {},
            message: {},
        };
        this._unsubscribeAll = new Subject();
    };

    ngOnInit() {
        this.form = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            topic: ['', Validators.required],
            message: ['', Validators.required],
        });
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.onFormValuesChanged();
            });
    }

    onFormValuesChanged(): void {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }
            // Clear previous errors
            this.formErrors[field] = {};
            // Get the control
            const control = this.form.get(field);
            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }
    }

    openMenu(){
        $('body').removeClass('noScroll');
        if ($('.collapse').hasClass('collapse-active')) {
            $('.collapse').removeClass('collapse-active');
        }
        else {
            $('.collapse').addClass('collapse-active');
        }
    }

}
