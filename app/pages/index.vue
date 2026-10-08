<template>
  <div>Ranobi</div>
  <div
    id="main_text"
    class="p-2"
    contenteditable
    @input="handleChangeMainText"
  >
    Загрузка...
  </div>
  <label class="border border-black">
    <span>Загрузить</span>
    <input id="upload_input" type="file" style="width: 0px" accept=".txt" />
  </label>
  <button id="save_file_btn" class="border border-black">
    Сохранить
  </button>
  <div class="fixed bottom-0">
    С пробелами - 
    <span id="counter_with_spaces"></span>.
    Без пробелов - 
    <span id="counter_without_spaces"></span>
  </div>
</template>

<script setup>
useHead({
  title: 'Ranobi',
});

function handleChangeMainText(evt) {
  // autosave
  localStorage.setItem('autosave', evt.target.textContent ?? '')

  // change counters
  const mainTextDiv = document.querySelector('#main_text');
  const counterWithSpacesSpan = document.querySelector('#counter_with_spaces');
  const counterWithoutSpacesSpan = document.querySelector('#counter_without_spaces');

  counterWithSpacesSpan.textContent = mainTextDiv.textContent.length;
  counterWithoutSpacesSpan.textContent = mainTextDiv.textContent.replaceAll(' ', '').length;
}

onMounted(() => {
  const mainTextDiv = document.querySelector('#main_text');

  // get autosave
  mainTextDiv.textContent = localStorage.getItem('autosave') ?? '';

  // get counters

  const counterWithSpacesSpan = document.querySelector('#counter_with_spaces');
  const counterWithoutSpacesSpan = document.querySelector('#counter_without_spaces');

  counterWithSpacesSpan.textContent = mainTextDiv.textContent.length;
  counterWithoutSpacesSpan.textContent = mainTextDiv.textContent.replaceAll(' ', '').length;

  // upload
  const uploadInput = document.querySelector('#upload_input');
  
  uploadInput.addEventListener('change', handleFileSelection);

  function handleFileSelection(evt) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        mainTextDiv.textContent = reader.result;
      };

      reader.readAsText(file);
    }
  }

  // save file
  const saveFileBtn = document.querySelector('#save_file_btn');

  saveFileBtn.addEventListener('click', handleSaveFileClick);

  function handleSaveFileClick() {
    const savingText = mainTextDiv.textContent;
    const savingTextBlob = new Blob([savingText]);

    const link = document.createElement('a');

    link.href = URL.createObjectURL(savingTextBlob);
    link.download = 'my_text';
    link.click();
  }
})

</script>