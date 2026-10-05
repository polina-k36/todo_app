import Modal from "@/components/Modal/Modal";
import CategoryForm from "../CategoryForm/CategoryForm";
import { useEffect, useState } from "react";
import { getCategoryById } from "@/api/categories";
import type { ICategory } from "@/types/category.types";
//передача категории а не айди??????

interface IEditCategoryFormModalProps {
  mode: "edit";
  categoryId: number;
  onCloseModal: () => void;
  onClickCancelBtn?: () => void;
  submitForm: (id: number, data: FormData) => void;
}

interface ICreateCategoryFormModalProps {
  mode: "create";
  categoryId?: never;
  onCloseModal: () => void;
  onClickCancelBtn?: () => void;
  submitForm: (data: FormData) => void;
}

type ICategoryFormModalProps =
  | IEditCategoryFormModalProps
  | ICreateCategoryFormModalProps;

const CategoryFormModal = ({
  mode,
  categoryId,
  onCloseModal,
  submitForm,
}: ICategoryFormModalProps) => {
  const [category, setCategory] = useState<ICategory | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (categoryId) {
      getCategoryById(categoryId)
        .then((data) => {
          setCategory(data.data);
          setLoading(false);
          setError(false);
        })
        .catch(() => setError(true));
    }
  }, []);

  return (
    <Modal
      header={mode === "create" ? "Новая категория" : "Редактирование"}
      size="medium"
      bodyPadding="24px 20px"
      onCloseModal={onCloseModal}
    >
      {mode === "create" ? (
        <CategoryForm onSubmitForm={submitForm} />
      ) : loading ? (
        "Загрзука..."
      ) : error ? (
        "Ошибка"
      ) : (
        <CategoryForm
          category={category}
          onSubmitForm={(data: FormData) => submitForm(categoryId, data)}
        />
      )}
    </Modal>
  );
};

export default CategoryFormModal;
