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

  public startTimer(): void {
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

  public waitTimer(): void {
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

  public resetTimer(): void {
    this.hour = 0
    this.minute = 0
    this.second = 0
  }

  public checkSeconds(): void {
    if (this.second < 60) {
      null
    } else {
      this.second = 0
      this.minute++
    }
  }

  public checkMinutes(): void {
    if (this.minute < 60) {
      null
    } else {
      this.minute = 0
      this.hour++
    }
  }

  public resetData(): void {
    this.resetTimer()
    this.startToggle = false
    this.waitToggle = false
  }
}
