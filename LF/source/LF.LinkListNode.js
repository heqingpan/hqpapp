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
