#ifndef StackElementType
#define StackElementType int
#endif

#ifndef _STACK_H
#define _STACK_H

#define MaxSize 50

struct Stack
{
  StackElementType data[MaxSize];
  int top;
};

void initStack(struct Stack *stack);
int pushStack(struct Stack *stack, int data);
int popStack(struct Stack *stack);
int getStackTop(struct Stack *stack);

#endif