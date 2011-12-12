/**
 * LF is a JavaScript Library
 *
 * https://github.com/heqingpan/hqpapp
 * Copyright (c) 2011 heqingpan
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * or GPL (GPL-LICENSE.txt) licenses.
 *
 * */

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

/** class LF.LinkListNode
 */
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
		if(This.nextNode)
		{
			This.nextNode=This.nextNode.nextNode||null;
		}
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
// end class LF.LinkListNode

/** class LF.LinkListNode2
 *
 */
LF.LinkListNode2=function(value,prevNode,nextNode)
{
	var This=this;

	this.value=value||null;
	this.prevNode=prevNode||null;
	this.nextNode=nextNode||null;

	this.insertAfter=function(value)
	{
		var node=new LF.LinkListNode2(value,This,This.nextNode);
		This.nextNode=node;
		if(node.nextNode)
		{
			node.nextNode.prevNode=node;
		}
	};

	this.insertBefore=function(value)
	{
		var node=new LF.LinkListNode2(value,This.prevNode,This);
		This.prevNode=node;
		if(node.prevNode)
		{
			node.prevNode.nextNode=node;
		}
	};

	this.removeNextNode=function()
	{
		if(This.nextNode)
		{
			This.nextNode=This.nextNode.nextNode;
			if(This.nextNode)
			{
				This.nextNode.prevNode=This;
			}
		}
	};

	this.removePrevNode=function()
	{
		if(This.prevNode)
		{
			This.prevNode=This.prevNode.prevNode;
			if(This.prevNode)
			{
				This.prevNode.nextNode=This;
			}
		}
	}

	this.visitThisToEnd=function(visiter)
	{
		visiter(This.value);
		if(This.nextNode)
		{
			This.nextNode.visitThisToEnd(visiter);
		}
	};

	this.visitThisToHead=function(visiter)
	{
		visiter(This.vlaue);
		if(This.prevNode)
		{
			This.prevNode.visitThisToHead(visiter);
		}
	}
};
/** end  example **/


/**
 *	end add LF.Class
 *
 *
 */

Top[libName]=LF;
})(window,"LF");

