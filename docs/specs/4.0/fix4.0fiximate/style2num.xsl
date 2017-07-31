<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">

	<xsl:template match="/">
		<HTML>
		<BODY bgcolor="e8e8e8">
			<A HREF="msg_ab.xml"><FONT face="Arial" color="#006699"><small>Sort Alphabetically</small></FONT></A>
			<P>
				<TABLE border="0" cellspacing="0" cellpadding="5">
				<xsl:apply-templates select="//TAG" />
			</TABLE>
			</P>
			<A HREF="msg_ab.xml">Sort Alphabetically</A>
		</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="TAG">
		<TR>
			<TD bgColor="#99ccff" align="center"><xsl:apply-templates select=".//fieldID" /></TD>
			<TD bgColor="#cccccc"><xsl:apply-templates select=".//fieldName" /></TD>
		</TR>
	</xsl:template>

	<xsl:template match="fieldID">
		<FONT face="Arial" color="#000080"><small><xsl:value-of /></small></FONT>
	</xsl:template>

	<xsl:template match="fieldName">
		<A STYLE="color:#006699">
			<xsl:attribute name="href">fixTable.xml#<xsl:value-of /></xsl:attribute>
			<xsl:attribute name="TARGET">dw</xsl:attribute>
			<FONT face="Arial"><small><xsl:value-of /></small></FONT>
		</A>
	</xsl:template>

</xsl:stylesheet>