import { Link } from "react-router-dom"
import { globals } from "../constants"

function Attestation() {
    return (
        <div>
            <div>
                {globals.appName[0].toLocaleUpperCase() + globals.appName.slice(1)} takes copyright and compliance issues seriously. Kindly ensure you review the following content before submitting
            </div>
            <h1>Attestation of Authorship, Compliance and Terms (ACTs)</h1>
            <p>By submitting content to {globals.appName}, I hereby affirm and attest that:</p>
            <p>
                {/* Ownerships and Rights */}
                1. I am the original author or have obtained all necessary rights, licenses, or permissions to upload, share, and distribute the research content on this platform. If co-authors are involved, I have obtained their consent to upload and distribute this content.
                2. I acknowledge that I am solely responsible for the content I upload, including any claims or disputes that may arise from its publication or distribution. I agree to indemnify and hold harmless {globals.appName} from any legal actions, claims, or disputes arising from my uploaded research content.
                3. The research content is accurate, original, and has not been plagiarized or falsified. I take full responsibility for the integrity of the data and conclusions presented.
            </p>
            <p>
                {/* Non-infringement */}
                4. The research content does not violate or infringe upon any third party&apos;s intellectual property rights, including but not limited to copyrights, patents, trademarks, or proprietary rights. I have properly cited all sources and adhered to all applicable copyright and citation standards.
            </p>
            <p>
                {/* Local laws compliance */}
                5. The research content complies with all relevant ethical guidelines, institutional review board (IRB) requirements, and legal regulations. It does not contain any unlawful, defamatory, or misleading material, and all data has been collected, processed, and presented in accordance with ethical standards.

            </p>
            <p>
                {/* Content use */}
                6. I ask {globals.appName} to use the research content I upload to train and enhance machine learning models. These models may analyze the content to predict trends, extrapolate emerging topics, and identify research interests within the field. This analysis helps improve the platform functionality and provides insights into research trends but will be conducted in compliance with applicable data protection laws. {globals.appName} will use aggregated and anonymized data for these purposes and will not use personal data for purposes other than those outlined in the privacy policy.
                7. I understand that I may control the visibility and distribution of my research through my privacy settings, which I can modify at any time.
            </p>
            <p>
                {/* Remove content violation */}
                8. I acknowledge and agree that {globals.appName} retains the exclusive right to remove, disable, or restrict access to any content that, in its sole discretion, violates the platform&apos;s terms of service, community guidelines, or any applicable laws and regulations. This includes, but is not limited to, content that is found to be infringing, unethical, defamatory, misleading, or otherwise harmful. I understand that such actions may be taken without prior notice to me.
            </p>
            <p>
                9. I confirm that I am at least 18 years old (the age required to upload content as publicised in the privacy policy) or have the consent of a parent or legal guardian to upload content to this platform. If I am under 18, I will ensure that my parent or legal guardian has reviewed and agreed to these terms on my behalf.
            </p>

            <p>Learn more about how {globals.appName} defines terms and handles copyright issues <Link to="" >here.</Link></p>
        </div>
    )
}

export default Attestation