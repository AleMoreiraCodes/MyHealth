import React, {useState} from "react"
import {TextInput, Text, View, TouchableOpacity, Vibration} from "react-native"
import ResultImc from "../ResultImc"
import styles from "./style"
import { Keyboard } from 'react-native'

export default function Form(){

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e a altura.")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)

    function imcCalculator(){
        return setImc((weight/(height*height)).toFixed(2))
    }

    function verificationImc(){
        if(imc == null){
            setErrorMessage("campo obrigatório*")
            Vibration.vibrate()
        }
    }

    function validationImc(){
        if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual a: ")
            setTextButton("Calcular novamente.")
            setErrorMessage(null)
            return
        }
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura.")
    }

    return(
        <View style={styles.formContent}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex 1.75"
                //keyboardType="numeric"
                />
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex 75.335"
                // keyboardType="numeric"
                />
                {/* <Button  */}
                {/* onPress={() => validationImc()} */}
                {/* title={textButton}/> */}
                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={() => {
                    validationImc()
                    Keyboard.dismiss()
                }}>
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/> 
        </View>
    );
}