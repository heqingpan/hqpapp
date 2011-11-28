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
