import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    loggedIn: boolean = false;
    logged$ = new Subject<void>();

    public setLogged(): void {
        this.loggedIn = true
        this.logged$.next()
    }

    public waitUntilLogged(): Observable<void> {
        return this.logged$.asObservable()
    }

    public checkIfLogged(): boolean {
        return this.loggedIn
    }
}