import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { newTrainers, ProgramCategoryKey } from "../../data/data";
import { useTranslation } from "../../i18n/use-translation";
import { HubButton } from "./hub-action";
import styles from "./trainer-dialog.module.css";

type Trainer = (typeof newTrainers)[number];
const TrainerDialogContext = createContext<{
  openTrainer: (trainer: Trainer, trigger: HTMLButtonElement) => void;
} | null>(null);

/** One shared dialog for Home and the filtered trainer catalog. Chakra owns focus/inert/scroll locking. */
export const TrainerDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selected, setSelected] = useState<Trainer | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  const descriptionId = useId();
  const { t, locale } = useTranslation();
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    setIsOpen(false);
    if (!trigger.current?.isConnected) trigger.current = null;
  }, [router.asPath, locale]);
  const copy = selected ? t.trainersPage.trainers[selected.key] : null;
  // Retain the current content through Chakra's exit transition.
  const onClose = () => setIsOpen(false);
  return (
    <TrainerDialogContext.Provider
      value={{
        openTrainer: (trainer, button) => {
          trigger.current = button;
          setSelected(trainer);
          setIsOpen(true);
        },
      }}
    >
      {children}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={close}
        finalFocusRef={trigger}
        returnFocusOnClose
        trapFocus
        useInert
        closeOnEsc
        closeOnOverlayClick
        preserveScrollBarGap
        allowPinchZoom
        isCentered
        scrollBehavior="inside"
        motionPreset={reducedMotion ? "none" : "slideInBottom"}
        size="xl"
      >
        <ModalOverlay
          bg="rgba(18, 28, 24, .7)"
          motionProps={
            reducedMotion ? { transition: { duration: 0 } } : undefined
          }
        />
        <ModalContent
          motionProps={
            reducedMotion ? { transition: { duration: 0 } } : undefined
          }
          data-tone="dark"
          className="hub-ui"
          bg="var(--hub-forest)"
          color="var(--hub-text)"
          border="1px solid var(--hub-border)"
          borderRadius="var(--hub-card-radius)"
          marginInline="20px"
          aria-describedby={descriptionId}
        >
          <ModalHeader
            as="h2"
            fontFamily="heading"
            fontSize="28px"
            paddingRight="72px"
          >
            {copy?.name}
          </ModalHeader>
          <ModalCloseButton
            ref={close}
            aria-label={t.ui.closeTrainerBio}
            width="44px"
            height="44px"
            top="12px"
            right="12px"
          />
          <ModalBody>
            {selected && copy && (
              <div className={styles.body}>
                <div className={styles.portrait}>
                  <Image
                    src={selected.imageSrc}
                    alt={copy.name}
                    fill
                    sizes="180px"
                  />
                </div>
                <div>
                  <p className={styles.specialty}>{copy.specialty}</p>
                  <p id={descriptionId} className={styles.biography}>
                    {copy.description}
                  </p>
                  <ul
                    className={styles.categories}
                    aria-label={t.ui.trainerAreas}
                  >
                    {selected.categories.map((category) => (
                      <li key={category.id}>
                        {
                          t.programsPage.categories[
                            category.key as ProgramCategoryKey
                          ]
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <HubButton
              variant="outline"
              arrow={false}
              className={styles.closeAction}
              onClick={onClose}
            >
              {t.ui.closeTrainerBio}
            </HubButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TrainerDialogContext.Provider>
  );
};
export const useTrainerDialog = () => {
  const context = useContext(TrainerDialogContext);
  if (!context) throw new Error("Trainer cards require TrainerDialogProvider");
  return context;
};
