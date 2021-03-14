import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {IGroupCollection} from "../../../class/IGroupCollection";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @Input() groups: IGroupCollection[] = [];
  demoArray = new Array(50);

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
  }

}
