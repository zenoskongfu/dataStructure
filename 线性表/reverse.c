#include <stdio.h>
struct List
{
  int *data;
  int length;
};

int reverse(struct List *L)
{
  if (L->length == 0)
    return -1;

  int i = 0, j = L->length - 1, temp = 0;
  while (i < j)
  {
    temp = L->data[i];
    L->data[i] = L->data[j];
    L->data[j] = temp;
    i++;
    j--;
  }
  return 0;
}

void straverseList(struct List *L)
{
  if (L->length == 0)
    return;
  for (int i = 0; i < L->length; i++)
  {
    printf("%d ", L->data[i]);
  }
  printf("\n");
}

int main()
{
  struct List L;
  int data[] = {1, 2, 3, 4, 5};
  L.data = data;
  L.length = 5;
  reverse(&L);
  straverseList(&L);
  return 0;
}