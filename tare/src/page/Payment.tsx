import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { AlertCircle } from "lucide-react";


// Define interfaces
interface FormField {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    error: string;
    required: boolean;
}

interface ApiResponse {
    details: string[];
}

const Payment = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formFields, setFormFields] = useState<Record<string, FormField>>({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const { paymentId } = useParams();

    useEffect(() => {
        const fetchFormFields = async () => {
            try {
                setIsLoading(true)

                // In a real implementation, replace this with your actual API call
                // const response = await fetch('your-api-endpoint');
                // const data: ApiResponse = await response.json();

                // Mock API response for demonstration
                const data: ApiResponse = {
                    details: ["name", "email", "phone number", "location"]
                }

                // Generate form fields from API data
                const fields: Record<string, FormField> = {}

                data.details.forEach(field => {
                    // Generate field ID from the field name
                    const fieldId = field.toLowerCase().replace(/\s+/g, "-")

                    // Create capitalized label
                    const label = field
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")

                    fields[fieldId] = {
                        id: fieldId,
                        label: label,
                        placeholder: `Enter your ${field.toLowerCase()}`,
                        value: "",
                        error: "",
                        required: true // All fields have required validation as per requirements
                    }
                })
                setFormFields(fields)
                setIsLoading(false)
            } catch (err) {
                setError("Failed to load form fields. Please try again later.")
                setIsLoading(false)
                console.error("Error fetching form fields:", err)
            }
        }

        fetchFormFields()
    }, [])

    // Validate form
    const validateForm = () => {
        let isValid = true
        const updatedFields = { ...formFields }

        Object.keys(formFields).forEach(fieldId => {
            const field = formFields[fieldId]

            // Only check required validation as specified
            if (field.required && !field.value.trim()) {
                isValid = false
                updatedFields[fieldId] = {
                    ...field,
                    error: `${field.label} is required`
                }
            }
        })

        setFormFields(updatedFields)
        return isValid
    }
    // Handle input changes
    const handleInputChange = (fieldId: string, value: string) => {
        setFormFields(prevFields => ({
            ...prevFields,
            [fieldId]: {
                ...prevFields[fieldId],
                value: value,
                error: "" // Clear error when user starts typing
            }
        }))
    }
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            // Collect form data for submission
            const formData = Object.keys(formFields).reduce((data, fieldId) => {
                data[fieldId] = formFields[fieldId].value
                return data
            }, {} as Record<string, string>)

            console.log("Form data to submit:", formData)
            alert("Payment submitted successfully!")
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
                <Card className="w-4/5 max-w-4xl">
                    <CardContent className="pt-6">
                        <div className="flex justify-center">
                            <p>Loading form fields...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
                <Card className="w-4/5 max-w-4xl">
                    <CardContent className="pt-6">
                        <div className="flex justify-center text-red-500">
                            <AlertCircle className="mr-2 h-5 w-5" />
                            <p>{error}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto">
                {/* Payment Form */}
                <Card className="w-4/5">
                    <CardHeader>
                        <CardTitle>Payment Details</CardTitle>
                        <CardDescription>Complete your purchase by providing your payment details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Dynamic Form Fields from API */}
                            <div className="space-y-4">
                                {Object.keys(formFields).map((fieldId) => (
                                    <div key={fieldId} className="grid gap-2">
                                        <Label htmlFor={formFields[fieldId].id}>{formFields[fieldId].label}</Label>
                                        <Input
                                            id={formFields[fieldId].id}
                                            value={formFields[fieldId].value}
                                            onChange={(e) => handleInputChange(fieldId, e.target.value)}
                                            placeholder={formFields[fieldId].placeholder}
                                            className={formFields[fieldId].error ? "border-red-500" : ""}
                                            required={formFields[fieldId].required}
                                        />
                                        {formFields[fieldId].error && (
                                            <p className="text-sm text-red-500">{formFields[fieldId].error}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button onClick={handleSubmit} className="w-full">
                            Pay 107 USDT
                        </Button>
                        <p className="text-xs text-center text-gray-500">
                            By clicking "Pay", you agree to our Terms of Service and Privacy Policy. Your payment information will be
                            processed securely.
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}


export default Payment