import React, {useState} from "react";
import initialCards from "./stateInitialCards";
import CreateCardModal from "./CreateCardModal";
import Card from "./Card";

const Main = () => {
    const [cards, setCards] = useState(initialCards);
    const [randomCard, setRandomCard] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [dataFromModal, setDataFromModal] = useState(null);
    const [prevRandomIndex, setPrevRandomIndex] = useState(null); //2
    const [isVisible, setIsVisible] = useState(false);

    const handleToggleModal = () => {
        setShowModal(!showModal)
    }

    const generateCard = () => {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * cards.length);
        } while (randomIndex === prevRandomIndex);

        setPrevRandomIndex(randomIndex);
        setRandomCard(cards[randomIndex]);
        setDataFromModal(null);
        setIsVisible(true);
    };

    const addCard = ({title, message, image}) => {
        setCards([...cards, {title, message, image}])
    }

    const handleDataFromChild = ({title, message, image}) => {
        setDataFromModal({title, message, image})
    }


    return(
        <main>
            <button onClick={generateCard}>Generate congratulation</button>
            <button  onClick={() => {
                setShowModal(true)
                setIsVisible(false)
            }}>Create personal congratulation</button>

            {showModal && (
                <CreateCardModal
                    showModal={showModal}
                    toggleModal={handleToggleModal}
                    addCard={addCard}
                    setData={handleDataFromChild}/>
            )}

            {randomCard  && isVisible &&(
                <Card
                    image={randomCard.image}
                    title={randomCard.title}
                    message={randomCard.message}/>
            )}

            {!showModal && dataFromModal && (
                <Card
                    image={dataFromModal.image}
                    title={dataFromModal.title}
                    message={dataFromModal.message}/>
            )}


        </main>
    );
}

export default Main;