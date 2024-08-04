import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const SlateEditor = () => {
  const [value, setValue] = useState('');
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    console.log('value:', value);
  }, [value]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'heading':
        return <HeadingElement {...props} />;
      case 'list':
        return <ListElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className='p-4 shadow-md rounded-lg'>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => 'set_selection' !== op.type
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            setValue(content);
          }
        }}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder='Введите ваш текст...'
          spellCheck
          className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        />
      </Slate>
    </div>
  );
};

const HeadingElement = (props) => {
  return (
    <h1 className='text-2xl font-bold' {...props.attributes}>
      {props.children}
    </h1>
  );
};

const ListElement = (props) => {
  return (
    <ul className='list-disc pl-6' {...props.attributes}>
      {props.children}
    </ul>
  );
};

const DefaultElement = (props) => {
  return (
    <p className='mb-2' {...props.attributes}>
      {props.children}
    </p>
  );
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

export default SlateEditor;
