import { Component, Input, OnInit } from '@angular/core';

export class CommentNode {
  text:string ='';
  anwsers:CommentNode[] = [];
  isOpen:false;
  constructor(text:string){
    this.text = text;
  }

  addAnwser(newComment:CommentNode){
    if(newComment.text){
      this.anwsers.push(newComment);
    }
  }

  removeComment(newComment:CommentNode){
    let index = this.anwsers.indexOf(newComment);
    if(~index){
      this.anwsers.slice(index,1);
    }
  }
}
@Component({
  selector: 'comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: [ './comment-tree.component.css' ]
})
export class CommentTree implements OnInit {
  @Input()
  comments:CommentNode[] = [];
  text:string;

  constructor(){}

  ngOnInit(){
    console.log(this.comments);
  }

  addComment(comment:CommentNode){
    comment.addAnwser(new CommentNode(this.text));      
    comment.isOpen = false;
    this.text="";    
    console.log(this.comments);
  }

  openCommentText(comment){
    console.log(comment)
    comment.isOpen = !comment.isOpen;
  }

  remove(comment:CommentNode){    
    let index = this.comments.indexOf(comment);
    this.comments = this.comments.splice(index,1);        
  }
}
