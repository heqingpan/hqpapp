(function(Top,libName){
var object={};
object.prototype={
	isA:function(aType){
			var self=this;
			var protoType=aType.prototype;
			while(self)
			{
				if(self==protoType){
					return true;
				}
				self=self.Type;
			};
			return false;
		}
};

var Class=function(aBaseClass,aClassDefine){
	if(arguments.length<1||arguments.length>2)
	{
		throw new Error("Error Builder Class!");
	}
	if(arguments.length==1)
	{
		aClassDefine=arguments[0];
		aBaseClass=object;
	}
	function class_(){
		this.Type=aBaseClass.prototype;
		for(var member in aClassDefine){
			this[member]=aClassDefine[member];
		}
	}
	class_.prototype=aBaseClass.prototype;
	var aClass= new class_();

	function constructor()
	{
		if(aClass.Create)
		{
			aClass.Create.apply(this,arguments);
		}
	};
	constructor.prototype=aClass;
	return constructor;
}

Top.Class=Class;

var LF={};
LF.object=object;
LF.Class=Class;
/** 
 *	begin add LF.Class 
 *
 *
 **/

/** example: add the LF.LinkListNode to the LIb **/

//// class LF.LinkListNode
LF.LinkListNode=function(value,nextNode)
{
	var This=this;
	this.value=value||null;
	this.nextNode=nextNode||null;
	this.insertAfter=function(value)
	{
		This.nextNode=new LF.LinkListNode(value,This.nextNode);		
	};
	this.removeNextNode=function()
	{
		This.nextNode=This.nextNode.nextNode;
	};
	this.visitThisToEnd=function(visiter)
	{
		visiter(This.value);
		if(This.nextNode)
		{
			This.nextNode.visitThisToEnd(visiter);
		}
	};
}
//// end class LF.LinkListNode

/** end  example **/


/**
 *	end add LF.Class
 *
 *
 */

Top[libName]=LF;
})(window,"LF");

