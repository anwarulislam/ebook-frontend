import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataService {
  public segments = new BehaviorSubject<any>([]);
  public admission = new BehaviorSubject<any>([]);
  public special = new BehaviorSubject<any>([]);
  public skill = new BehaviorSubject<any>([]);

  // getAllSegments = this.segments.asObservable()
  public chapters = new BehaviorSubject<any>([]);
  public quizzes = new BehaviorSubject<any>([]);
  public smartbooks = new BehaviorSubject<any>([]);
  public currentVideo = new BehaviorSubject<any>([]);
  public currentCourse = new BehaviorSubject<any>([]);

  activeState: string;
  constructor(private http: HttpClient) {
    // this.getSegments()
    // this.getAdmissionSegment().subscribe(data => this.admission.next(data))
    // this.getSpecialSegments().subscribe(data => this.special.next(data))
    // this.getSkillSegments().subscribe(data => this.skill.next(data))
  }

  //// Class service

  getClasses() {
    return this.http.get<[]>(`${environment.api_url}classes`);
  }

  createClass(data) {
    return this.http.post(`${environment.api_url}classes`, data);
  }

  updateClass(data) {
    return this.http.put(`${environment.api_url}classes`, data);
  }

  deleteClass(id) {
    return this.http.delete(`${environment.api_url}classes/${id}`);
  }

  /// Subject service
  getSubjects(query) {
    let url = `${environment.api_url}subjects?${this.objectToUrl(query)}`;
    // console.log(url)
    return this.http.get(url);
  }

  createSubject(data) {
    return this.http.post(`${environment.api_url}subjects`, data);
  }

  updateSubject(data) {
    return this.http.put(`${environment.api_url}subjects`, data);
  }

  deleteSubject(id) {
    return this.http.delete(`${environment.api_url}subjects/${id}`);
  }

  /// Topics service
  getTopics(query) {
    return this.http.get(
      `${environment.api_url}topics?${this.objectToUrl(query)}`
    );
  }

  createTopic(data) {
    return this.http.post(`${environment.api_url}topics`, data);
  }

  updateTopic(data) {
    return this.http.put(`${environment.api_url}topics`, data);
  }

  deleteTopic(id) {
    return this.http.delete(`${environment.api_url}topics/${id}`);
  }

  /// Questions service
  getQuestions() {
    return this.http.get(`${environment.api_url}questions`);
  }

  createQuestion(data) {
    return this.http.post(`${environment.api_url}questions`, data);
  }

  updateQuestion(data) {
    return this.http.put(`${environment.api_url}questions`, data);
  }

  deleteQuestion(id) {
    return this.http.delete(`${environment.api_url}questions/${id}`);
  }

  //groups
  getGroups() {
    return this.http.get(`${environment.api_url}groups`);
  }

  private handleError(errorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error("Client Side error " + errorResponse.error.message);
    } else {
      console.error("Server Side error " + errorResponse.error.message);
    }

    return throwError("There is a problem in loading data.");
  }

  convertToJson(value: any) {
    value = value.split("\n");

    var attrs = value.splice(0, 1);

    var result = value.map(function(row) {
      var obj = {};
      var rowData = row.split(",");
      attrs[0].split(",").forEach(function(val, idx) {
        obj = constructObj(val, obj, rowData[idx]);
      });
      return obj;
    });

    function constructObj(str, parentObj, data) {
      if (str.split("//").length === 1) {
        parentObj[str] = data;
        return parentObj;
      }

      var curKey = str.split("//")[0];
      if (!parentObj[curKey]) parentObj[curKey] = {};
      parentObj[curKey] = constructObj(
        str
          .split("//")
          .slice(1)
          .join("//"),
        parentObj[curKey],
        data
      );
      return parentObj;
    }

    return result;
  }

  objectToUrl(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
}
