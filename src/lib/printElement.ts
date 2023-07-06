/* print the specified element */
const printElement = (element: HTMLElement | undefined, filename: string) => {
  const documentTitle = document.title;

  if (!element) {
    console.error('Attempted to print non-existing element!');
    return;
  }
  try {
    // copy the element to body
    const printNode = document.createElement('div');
    printNode.appendChild(element.cloneNode(true));
    printNode.id = 'print-area';
    document.body.appendChild(printNode);

    // initiate print
    console.log('DOM copied. Initiating print...');
    document.title = filename;
    window.print();
  } finally {
    // revert the document title
    document.title = documentTitle;
    // remove the copied element from body
    const printArea = document.getElementById('print-area');
    if (printArea) {
      document.body.removeChild(printArea);
    }
    console.log('cleaned printable DOM!');
  }
};
export default printElement;
