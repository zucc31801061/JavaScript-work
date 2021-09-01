class Tree{
    value=null;
    left=null;
    right=null;
    add=(x)=>{
        if(this.value===null){
            this.value=x;
        }
        else{
            if(x<this.value){
                if(this.left===null){
                    this.left= new Tree();
                }
                this.left.add(x)
            }
            else{
                if(this.right===null){
                    this.right= new Tree();
                }
                this.right.add(x)
            }
        }
    }

    deep=()=>{
        if(this.value===null){
            return 0;
        }
        else{
            if(this.left===null&&this.right===null){
                return 1;
            }
            else if(this.left===null){
                return this.right.depth()+1;
            }
            else if(this.right===null){
                return this.left.depth()+1
            }
            else{
                return (this.left.depth()+1)>(this.right.depth()+1)?  (this.left.depth()+1):(this.right.depth()+1)
            }
        }
    }
}