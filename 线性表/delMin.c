#include <stdio.h>
#include "util.h"

int Del_Min(struct List *L, int *value)
{
  if (L->length == 0)
    return -1;

  int min = 0;

  for (int i = 1; i < L->length; i++)
  {
    if (L->data[i] < L->data[min])
    {
      min = i;
    }
  }
  *value = L->data[min];
  L->data[min] = L->data[L->length - 1];
  L->length--;
  return *value;
}

int main()
{
  struct List L;
  L.length = 10;
  int data[] = {11, 82, 73, 42, 15, 36, 27, 18, 9, 10};
  L.data = data;

  int value = -1;
  int result = Del_Min(&L, &value);
  printf("the min value is %d;\n", value);
  printf("the result is %d;\n", result);
  traverseArray(&L);

  return 0;
}