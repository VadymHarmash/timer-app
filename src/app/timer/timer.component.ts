import { Component } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  public hour: number = 0
  public minute: number = 0
  public second: number = 0

  public startToggle: boolean = false
  public waitToggle: boolean = false

  public timerInterval: Observable<number> = interval(1000)
  
  private subscription$: Subscription

  startTimer(): void {
    if (!this.startToggle) {
      this.startToggle = !this.startToggle
      this.subscription$ = this.timerInterval.subscribe(() => {
        this.second++
        this.checkSeconds()
        this.checkMinutes()
      })
    } else {
      this.startToggle = !this.startToggle
      this.resetData()
      this.subscription$.unsubscribe()
    }
  }

  waitTimer(): void {
    if (this.startToggle === true) {
      this.waitToggle = !this.waitToggle
      this.waitToggle === true ? this.subscription$.unsubscribe() : this.subscription$ = this.timerInterval.subscribe(() => {
        this.second++
        this.checkSeconds()
        this.checkMinutes()
      })
    } else {
      alert("You cannot to click this button until you start timer")
    }
  }

  resetTimer(): void {
    this.resetData()
    if (this.subscription$) {
      this.subscription$.unsubscribe()
    }
  }

  checkSeconds(): void {
    if (this.second < 60) {
      this.minute = this.minute
    } else {
      this.second = 0
      this.minute++
    }
  }

  checkMinutes(): void {
    if (this.minute < 60) {
      this.hour = this.hour
    } else {
      this.minute = 0
      this.hour++
    }
  }

  resetData(): void {
    this.hour = 0
    this.minute = 0
    this.second = 0
    this.startToggle = false
    this.waitToggle = false
  }
}
