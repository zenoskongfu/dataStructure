#define StackElementType char

#include "util.h"

void initStack(struct Stack *stack)
{
  stack->top = -1;
}

boolean pushStack(struct Stack *stack, StackElementType data)
{
  if (stack->top == MaxSize - 1)
    return 0;
  stack->data[++stack->top] = data;
  return 1;
}

bool popStack(struct Stack *stack, StackElementType *data)
{
  if (stack->top == -1)
    return (StackElementType)0;
  int result = stack->data[stack->top--];
  return result;
}

StackElementType getStackTop(struct Stack *stack)
{
  if (stack->top == -1)
    return (StackElementType)0;
  return stack->data[stack->top];
}

// int main(int argc, char const *argv[])
// {
//   struct Stack stack;
//   initStack(&stack);
//   pushStack(&stack, 1);
//   pushStack(&stack, 3);
//   pushStack(&stack, 5);
//   pushStack(&stack, 7);
//   pushStack(&stack, 9);

//   printf("%d ", getStackTop(&stack));
//   popStack(&stack);
//   printf("%d ", getStackTop(&stack));
//   popStack(&stack);
//   popStack(&stack);
//   printf("%d ", getStackTop(&stack));

//   return 0;
// }
