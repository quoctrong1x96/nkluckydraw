
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { delay, first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { RewardService, AlertService } from '@app/_services';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-reward-add-edit',
    templateUrl: './reward-add-edit.component.html',
    styleUrl: './reward-add-edit.component.css',
    providers: [FormBuilder] // Khai báo FormBuilder nếu cần
})
export class RewardAddEditComponent implements OnInit {
    form: FormGroup<any> = new FormGroup<any>({});
    id: string = "0";
    isAddMode: boolean = false;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private rewardService: RewardService,
        private alertService: AlertService,

        private location: Location,
    ) {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        // // password not required in edit mode
        // const passwordValidators = [Validators.minLength(6)];
        // if (this.isAddMode) {
        //     passwordValidators.push(Validators.required);
        // }

        this.form = this.formBuilder.group({
            name: ['', Validators.maxLength(20)],
            imageUrl: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0), Validators.maxLength(11)]],
            totalDrawNumber: ['', [Validators.min(0), Validators.max(100)]]
        });

        if (!this.isAddMode) {
            this.rewardService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    ngOnInit() {

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        console.log("onSubmit");

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createReward();
        } else {
            this.updateReward();
        }
        this.location.back();
    }

    private createReward() {
        this.rewardService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Reward added', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateReward() {
        this.rewardService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Reward updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({
                imageUrl: "assets/reward/" + file.name // Gán giá trị của trường imageUrl với đối tượng File được chọn
            });
        }


    }
    onInput(event: any) {
        let inputValue: string = event.target.value;

        // Viết in hoa và giới hạn độ dài là 12 ký tự
        inputValue = inputValue.toUpperCase().substr(0, 12);

        // Cập nhật giá trị trong form
        this.form.patchValue({
            name: inputValue
        });
    }


}