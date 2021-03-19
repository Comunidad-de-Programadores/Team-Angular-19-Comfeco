import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {IGroupCollection} from '../../../class/IGroupCollection';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';
import {User} from '../../../class/User';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {


  groupsFromService: IGroupCollection[] = [];
  filteredGroups: IGroupCollection[] = [];
  usersOfCurrentGroup: User[] = [];
  inputSearchControl: FormControl = new FormControl('');
  currentGroup: IGroupCollection;
  enteringGroup = false;

  constructor(public dataService: DataService, public userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.getCurrentGroup();
    this.inputSearchControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(value => {
      this.filterGroups(value);
    });
  }

  async getGroupsByLang(lang: string): Promise<void> {
    this.groupsFromService = await this.dataService.getGroups(lang);
    this.filteredGroups = this.groupsFromService;
    console.log(this.groupsFromService);
    this.inputSearchControl.patchValue('');
  }

  filterGroups(query: string): void {
    if (query === '') {
      this.filteredGroups = this.groupsFromService;
      return;
    }
    this.filteredGroups = this.groupsFromService.filter(value => value.name.toLowerCase() === query.toLowerCase());
  }

  async getCurrentGroup(): Promise<void> {
    this.currentGroup = await this.dataService.getGroupOfUser(this.userService.user.uid);
    this.usersOfCurrentGroup = await this.dataService.getUsersOfGroup(this.currentGroup.idUsers);
    console.warn('current group =>', this.currentGroup);
    console.warn('current Users =>', await this.dataService.getUsersOfGroup(this.currentGroup.idUsers));
  }

  async joinUserToGroup(uid: string, idGroup: string): Promise<void> {
    this.enteringGroup = true;
    await this.dataService.setUserToGroup(uid, idGroup);
    await this.getCurrentGroup();
    this.enteringGroup = false;
  }

  async leaveGroup(): Promise<void> {
    await this.dataService.quitUserOfGroup(this.userService.user.uid, this.currentGroup.id);
    await this.getCurrentGroup();
  }
}
