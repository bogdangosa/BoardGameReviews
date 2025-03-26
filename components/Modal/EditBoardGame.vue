<template>
  <div class="modal">
    <div class="overlay z-0" @click="closeModal"></div>
    <div class="modal-content bg-neutral2 p-8 z-2">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="mb-4">Edit Board Game</h2>
      <form @submit.prevent="editBoardgame">
        <div class="form-group">
          <p for="name">Name:</p>
          <input
            class="bg-neutral1 w-full p-4"
            id="name"
            type="text"
            required
            v-model="boardGameName"
          />
        </div>
        <div class="form-group">
          <p for="description" requiered>Description:</p>

          <textarea
            id="description"
            v-model="boardGameDescription"
            class="bg-neutral1 w-full p-4"
          ></textarea>
        </div>
        <div class="flex gap-4">
          <div class="form-group">
            <p for="image">Image:</p>
            <input
              class="file-input bg-neutral1 w-fit p-4"
              type="file"
              name="image"
              @change="previewFiles"
            />
          </div>
          <div class="form-group">
            <p for="category">Category:</p>
            <Dropdown
              :options="categories"
              v-on:update:selectedOption="updateSelectedCategory"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <Button color="accent1" type="submit">Edit Board Game</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditBoardGame",
  props: {
    boardgame: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props);
    const boardGameName = ref(props.boardgame?.title);
    const boardGameDescription = ref(props.boardgame?.description);
    const boardGameImage = ref(props.boardgame?.image);
    const selectedCategory = ref(props.boardgame?.category);

    const categories = [
      "Abstract",
      "Strategy",
      "Party",
      "Family",
      "Cooperative",
    ];
    return {
      boardGameName,
      boardGameDescription,
      boardGameImage,
      categories,
      selectedCategory,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    editBoardgame() {
      this.$emit("editBoardgame", {
        title: this.boardGameName,
        description: this.boardGameDescription,
        image: this.boardGameImage,
        category: this.selectedCategory,
        rating: this.boardgame.rating,
      });
      this.closeModal();
    },
    previewFiles(event) {
      console.log(event.target.files);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.boardGameImage = reader.result;
        console.log(reader.result);
      };
    },
    updateSelectedCategory(newCategory) {
      console.log(newCategory);
      this.selectedCategory = newCategory;
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal-content {
  border-radius: 5px;
  width: 600px;
  max-width: 90%;
}

.close {
  float: right;
  font-size: 32px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.file-input {
  border-radius: 8px;
}
</style>
